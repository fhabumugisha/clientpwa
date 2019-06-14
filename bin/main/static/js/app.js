var enableNotificationsButtons = document.querySelectorAll(
	".enable-notifications"
);
var deferredPrompt;
if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("../OneSignalSDKWorker.js")
		.then(function () {
			console.log("Service worker registered!");
		})
		.catch(function (err) {
			console.log(err);
		});
}

if (!window.Promise) {
	window.Promise = Promise;
}

window.addEventListener("beforeinstallprompt", function (event) {
	console.log("beforeinstallprompt fired");
	event.preventDefault();
	deferredPrompt = event;
	return false;
});

$(".fab").click(function () {
	//$('#exampleModal').modal('toggle')
	location.href = $(this).data("url");
});

$(function () {
	if (deferredPrompt) {
		deferredPrompt.prompt();

		deferredPrompt.userChoice.then(function (choiceResult) {
			console.log(choiceResult.outcome);

			if (choiceResult.outcome === "dismissed") {
				console.log("User cancelled installation");
			} else {
				console.log("User added to home screen");
			}
		});

		deferredPrompt = null;
	}

	$(".messageBox").click(function () {
		location.href = "/messages?id=" + $(this).data("url");
		return false;
	});
});

// Push Notification

var $notifyBtn = $("#notifyBtn");
var $notifyIcon = $notifyBtn.find(".notifyIcon");

if ("Notification" in window && "serviceWorker" in navigator) {
	$notifyBtn.removeClass("d-none");
	if (Notification.permission !== "denied") {
		$notifyBtn.prop("disabled", false);
	}

	var reg;
	navigator.serviceWorker.ready.then(function (swreg) {
		reg = swreg;
		swreg.pushManager.getSubscription().then(s => {
			var isSubscribed = s !== null;
			if (isSubscribed) {
				$notifyIcon.removeClass("fa-bell-o").addClass("fa-bell-slash");
			} else {
				$notifyIcon.removeClass("fa-bell-slash").addClass("fa-bell-o");
			}
		});
	});

	//	for (var i = 0; i < enableNotificationsButtons.length; i++) {
	//		enableNotificationsButtons[i].style.display = 'inline-block';
	//		enableNotificationsButtons[i].addEventListener('click', askForNotificationPermission);
	//	}

	$notifyBtn.click(askForNotificationPermission);
}

function askForNotificationPermission() {
	$notifyBtn.prop("disabled", true);

	reg.pushManager
		.getSubscription()
		.then(s => {
			if (s !== null) {
				console.log("Unsubscribe push notification");
				s.unsubscribe()
				.then(() => {
					console.log("You've successfully unsubscribed");
					//todo tell the server to delete subscription
					fetch("/webspush/unsubscribe", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(s)
					});
					$notifyIcon.removeClass("fa-bell-slash").addClass("fa-bell-o");
					$notifyBtn.prop("disabled", false);
			    }).catch(e => {
			    	console.log("Unsubscription failed ", e);
			    });
			
				
			} else {
				// Create a new subscription
				var vapidPublicKey =
					"BCX0pPjyzSmBbLVGYv9sSTxQ1Y7747Q9b5g9Vn9Xh_vFk5ZJaLwdhiLU1gU0U1mBUhLL7lZTNQjtPQ41KJzOobk=";
				var convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
				return reg.pushManager.subscribe({
						userVisibleOnly: true,
						applicationServerKey: convertedVapidPublicKey
					}).then(newSub => {
						const subscription = {
							notificationEndPoint: newSub.endpoint,
							publicKey: newSub.getKey("p256dh"),
							auth: newSub.getKey("auth")
						};
						return fetch("/webspush/subscribe", {
							method: "POST",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify(newSub)
						});
					})
					.then(res => {
						if (res.ok) {
							$notifyIcon.removeClass("fa-bell-o").addClass("fa-bell-slash");
							$notifyBtn.prop("disabled", false);
							displayConfirmNotification();
						}
					});
			}
		}).catch(err => {
			console.log(err);
		});
	/* Notification.requestPermission(function(result) {
	  console.log("User Choice", result);
	  if (result !== "granted") {
	    console.log("No notification permission granted!");
	  } else {
	    configurePushSub();
	    // displayConfirmNotification();
	  }
	}); */
}

function configurePushSub() {
	if (!("serviceWorker" in navigator)) {
		return;
	}

	var reg;
	navigator.serviceWorker.ready
		.then(function (swreg) {
			reg = swreg;
			return swreg.pushManager.getSubscription();
		})
		.then(function (sub) {
			if (sub === null) {
				// Create a new subscription
				var vapidPublicKey =
					"BCX0pPjyzSmBbLVGYv9sSTxQ1Y7747Q9b5g9Vn9Xh_vFk5ZJaLwdhiLU1gU0U1mBUhLL7lZTNQjtPQ41KJzOobk=";
				var convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
				return reg.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: convertedVapidPublicKey
				});
			} else {
				// We have a subscription
				console.log("We have a subscription");
			}
		})
		.then(function (newSub) {
			const subscription = {
				notificationEndPoint: newSub.endpoint,
				publicKey: newSub.getKey("p256dh"),
				auth: newSub.getKey("auth")
			};
			return fetch("/webspush/subscribe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newSub)
			});
		})
		.then(function (res) {
			if (res.ok) {
				displayConfirmNotification();
				for (var i = 0; i < enableNotificationsButtons.length; i++) {
					enableNotificationsButtons[i].style.display = "none";
				}
			}
		})
		.catch(function (err) {
			console.log(err);
		});
}

function displayConfirmNotification() {
	if ("serviceWorker" in navigator) {
		var options = {
			body: "You successfully subscribed to our Notification service!",
			icon: "/images/icons/app-icon-96x96.png",
			image: "/images/mono.png",
			dir: "ltr",
			lang: "fr-FR", // BCP 47,
			vibrate: [100, 50, 200],
			badge: "/images/icons/app-icon-96x96.png",
			tag: "confirm-notification",
			renotify: true
			//      actions: [
			//        { action: 'confirm', title: 'Okay', icon: '/images/icons/app-icon-96x96.png' },
			//        { action: 'cancel', title: 'Cancel', icon: '/images/icons/app-icon-96x96.png' }
			//      ]
		};

		navigator.serviceWorker.ready.then(function (swreg) {
			swreg.showNotification("Successfully subscribed!", options);
		});
	}
}
var count = 0;
var title = document.title;
if ("serviceWorker" in navigator) {
	// Handler for messages coming from the service worker
	navigator.serviceWorker.addEventListener("message", function (event) {
		console.log("Client 1 Received Message: " + event.data);
		$(".notifBadge").html("1");
		count ++;
		var newTitle = '(' + count + ') ' + title;
	    document.title = newTitle;
	});
}