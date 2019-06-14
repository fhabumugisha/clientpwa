package com.buseni.clientpwa.webpush;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;





@RestController
@RequestMapping("/webspush")
public class WebPushApi {
	@Autowired
	private WebPushService webPushService ;
	


	
	
	@PostMapping("/subscribe")
	 @CrossOrigin
	public void subscribe(@RequestBody SubscriptionDto subscriptionDto) {
		webPushService.subscribe(subscriptionDto);
	}
	
	@PostMapping("/unsubscribe")
	public void unsubscribe(@RequestBody SubscriptionDto subscriptionDto) {
		 webPushService.unSubscribe(subscriptionDto);
	}

	

}
