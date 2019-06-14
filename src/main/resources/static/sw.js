importScripts('/js/idb.js');
importScripts('/js/utility.js');
var CACHE_STATIC_NAME = 'static-v1';
var CACHE_DYNAMIC_NAME = 'dynamic-v3';

var STATIC_FILES = [

	// 'home.html',
	//	'/offline.html',
	//	'/js/app.js',
	//	'/js/utility.js',	  
	//	'feed.js',
	//	'idb.js',
	//	'promise.js',
	//	'fetch.js',
	//	'/static/css/app.css'
	//	'/app.css',
	//	'https://code.jquery.com/jquery-3.3.1.slim.min.js',
	//	'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
	//	'https://stackpath.bootstrapcdn.com/bootstrap/4.3.0/js/bootstrap.min.js',
	//	'https://stackpath.bootstrapcdn.com/bootstrap/4.3.0/css/bootstrap.min.css'
];

self.addEventListener('install', function (event) {
	console.log('[Service Worker] Installing Service Worker ...', event);
	event.waitUntil(
		caches.open(CACHE_STATIC_NAME)
		.then(function (cache) {
			console.log('[Service Worker] Precaching App Shell');
			cache.addAll(STATIC_FILES);
		})
	)

});

self.addEventListener('activate', function (event) {
	console.log('[Service Worker] Activating Service Worker ....', event);
	event.waitUntil(
		caches.keys()
		.then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
					console.log('[Service Worker] Removing old cache.', key);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});


self.addEventListener('fetch', function (event) {
	if (event.request.headers.get('accept').includes('text/html')) {
		event.respondWith(
			fetch(event.request)
			.then(function (res) {
				return caches.open(CACHE_DYNAMIC_NAME)
					.then(function (cache) {
						console.log("Add dynamic cache");
						cache.put(event.request.url, res.clone());
						return res;
					})
			})
			.catch(function (err) {
				console.log("Offline : ", err);
				return caches.match(event.request)
					.then(function (response) {
						if (response) {
							return response;
						} else {
							console.log("Offline");
							return new Response('<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:sec="http://www.thymeleaf.org/extras/spring-security"><head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> <meta name="description" content=""> <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors"> <meta name="generator" content="Jekyll v3.8.5"> <title>Client PWA Offline</title> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.0/css/bootstrap.min.css" integrity="sha384-PDle/QlgIONtM1aqA2Qemk5gPOE7wFq8+Em+G/hmo5Iq0CCmYZLv3fVRDJ4MMwEA" crossorigin="anonymous"></head> <body> <header> <nav class="navbar navbar-expand-lg bg-dark navbar-dark"> <a class="navbar-brand" href="#" th:href="@{/}">Client PWA</a> </nav></header><main role="main" class="container-fluid"><div class="row"><div class="col-md-6"> <h5 class="text-center text--primary">We  are sorry, this page has not been cached yet :/</h5> <p>But why do not you try one of our <a href="/" th:href="@{/}">other pages</a>?</p></div></div></main> </body></html>', {
								headers: {
									'Content-type': 'text/html'
								}
							});
						}

					}).catch(function (error) {
						console.log("Offline");
						return new Response('<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:sec="http://www.thymeleaf.org/extras/spring-security"><head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> <meta name="description" content=""> <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors"> <meta name="generator" content="Jekyll v3.8.5"> <title>Client PWA Offline</title> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.0/css/bootstrap.min.css" integrity="sha384-PDle/QlgIONtM1aqA2Qemk5gPOE7wFq8+Em+G/hmo5Iq0CCmYZLv3fVRDJ4MMwEA" crossorigin="anonymous"></head> <body> <header> <nav class="navbar navbar-expand-lg bg-dark navbar-dark"> <a class="navbar-brand" href="#" th:href="@{/}">Client PWA</a> </nav></header><main role="main" class="container-fluid"><div class="row"><div class="col-md-6"> <h5 class="text-center text--primary">We  are sorry, this page has not been cached yet :/</h5> <p>But why do not you try one of our <a href="/" th:href="@{/}">other pages</a>?</p></div></div></main> </body></html>', {
							headers: {
								'Content-type': 'text/html'
							}
						});
					});
			})
		);


	} else {

		if (isInArray(event.request.url, STATIC_FILES)) {
			event.respondWith(caches.match(event.request));
		} else {
			event.respondWith(
				caches.match(event.request)
				.then(function (response) {
					if (response) {
						return response;
					} else {
						return fetch(event.request)
							.then(function (res) {
								return caches.open(CACHE_DYNAMIC_NAME)
									.then(function (cache) {
										console.log("Add dynamic cache");
										cache.put(event.request.url, res.clone());
										return res;
									})

							})
							.catch(function (err) {
								console.log("Offline");
								if (event.request.headers.get('accept').includes('text/html')) {
									return new Response('<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns:sec="http://www.thymeleaf.org/extras/spring-security"><head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> <meta name="description" content=""> <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors"> <meta name="generator" content="Jekyll v3.8.5"> <title>Client PWA Offline</title> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.0/css/bootstrap.min.css" integrity="sha384-PDle/QlgIONtM1aqA2Qemk5gPOE7wFq8+Em+G/hmo5Iq0CCmYZLv3fVRDJ4MMwEA" crossorigin="anonymous"></head> <body> <header> <nav class="navbar navbar-expand-lg bg-dark navbar-dark"> <a class="navbar-brand" href="#" th:href="@{/}">Client PWA</a> </nav></header><main role="main" class="container-fluid"><div class="row"><div class="col-md-6"> <h5 class="text-center text--primary">We  are sorry, this page has not been cached yet :/</h5> <p>But why do not you try one of our <a href="/" th:href="@{/}">other pages</a>?</p></div></div></main> </body></html>', {
										headers: {
											'Content-type': 'text/html'
										}
									});
								}
							});
					}
				})
			);
		}
	}
});

function isInArray(string, array) {
	var cachePath;
	if (string.indexOf(self.origin) === 0) { // request targets domain where we serve the page from (i.e. NOT a CDN)
		//console.log('matched ', string);
		cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
	} else {
		cachePath = string; // store the full request (for CDNs)
	}
	return array.indexOf(cachePath) > -1;
}


self.addEventListener('sync', function (event) {
	console.log('[Service Worker] Background syncing', event);
	if (event.tag === 'sync-new-questions') {
		console.log('[Service Worker] Syncing new Questions');
		event.waitUntil(
			readAllData('sync-questions')
			.then(function (data) {
				for (var dt of data) {
					var questionData = new FormData();
					// questionData.append('id', dt.id);
					questionData.append('title', dt.title);
					questionData.append('description', dt.description);
					questionData.append('fullName', dt.fullName);
					//let url ='http://localhost:8080/ask-question-sync';
					let url = "/ask-question-sync";
					fetch(url, {
							method: 'POST',
							body: questionData
						})
						.then(function (res) {
							console.log('Sent data', res);
							if (res.ok) {
								deleteItemFromData('sync-questions', dt.id);
								//								res.json()
								//								.then(function (resData) {
								//								// deleteItemFromData('sync-questions', dt.id);
								//								});
							}
						})
						.catch(function (err) {
							console.log('Error while sending data', err);
						});
				}

			})
		);
	}
});



self.addEventListener('notificationclick', function (event) {
	var notification = event.notification;
	var action = event.action;

	console.log(notification);

	if (action === 'confirm') {
		console.log('Confirm was chosen');
		notification.close();
	} else {
		console.log(action);
		event.waitUntil(
			clients.matchAll()
			.then(function (clis) {
				var client = clis.find(function (c) {
					return c.visibilityState === 'visible';
				});

				if (client !== undefined) {
					client.navigate(notification.data.url);
					client.focus();
				} else {
					clients.openWindow(notification.data.url);
				}
				notification.close();
			})
		);
	}
});

self.addEventListener('notificationclose', function (event) {
	console.log('Notification was closed', event);
});

//Push
self.addEventListener('push', function (event) {
	console.log('Push Notification received', event);

	var data = {
		title: 'New!',
		content: 'Something new happened!',
		openUrl: '/'
	};

	if (event.data) {
		data = JSON.parse(event.data.text());
	}

	console.log("Data received : ", data);
	var options = {
		body: data.message,
		icon: '/images/icons/app-icon-96x96.png',
		badge: '/images/icons/app-icon-96x96.png',
		image: '/images/mono.png',
		data: {
			//url: data.openUrl
			url: "/messages?id=" + data.messageId + "&utm_source=pushnotif"
		}
	};



	const promiseChain = isClientFocused()
		.then((clientIsFocused) => {
			if (clientIsFocused) {
				//			    	const allClients = clients.matchAll({
				//						includeUncontrolled: true
				//					});
				//					for (const client of allClients) {
				//						client.postMessage({
				//					          message: 'Received a push message.',
				//					          time: new Date().toString()
				//					        });
				//					}
				//			      windowClients.forEach((windowClient) => {
				//			        windowClient.postMessage({
				//			          message: 'Received a push message.',
				//			          time: new Date().toString()
				//			        });
				//			      });

				clients.matchAll().then(clients => {
					clients.forEach(client => {
						client.postMessage({
							message: 'Received a push message.',
							time: new Date().toString()
						});
					})
				})
			} else {
				return self.registration.showNotification(data.title, options);
			}
		});

	event.waitUntil(promiseChain);

});

function isClientFocused() {
	return clients.matchAll({
			type: 'window',
			includeUncontrolled: true
		})
		.then((windowClients) => {
			let clientIsFocused = false;

			for (let i = 0; i < windowClients.length; i++) {
				const windowClient = windowClients[i];
				if (windowClient.focused) {
					clientIsFocused = true;
					break;
				}
			}

			return clientIsFocused;
		});
}