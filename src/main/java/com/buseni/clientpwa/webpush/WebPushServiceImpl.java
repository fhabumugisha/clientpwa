package com.buseni.clientpwa.webpush;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.buseni.clientpwa.questions.Question;
import com.buseni.clientpwa.questions.QuestionServiceImpl;

@Service
public class WebPushServiceImpl implements WebPushService {
	
	public static final Logger LOGGER = LoggerFactory.getLogger( WebPushServiceImpl.class );
	
	@Value("${adminpwa.url}")
	private String adminPwaUrl;
	@Value("${adminpwa.accessToken}")
	private String accessToken;
	private RestTemplate restTemplate;
	
	public WebPushServiceImpl(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	@Override
	public void subscribe(SubscriptionDto subscriptionDto) {
		LOGGER.debug("Call API Subscribe ");
		 restTemplate.postForObject(UriComponentsBuilder.fromUriString(adminPwaUrl+"/api/v1/webspush/subscribe").build().toUri(), subscriptionDto, SubscriptionDto.class);

	}

	@Override
	public void unSubscribe(SubscriptionDto subscriptionDto) {
		LOGGER.debug("Call API Unsubscribe ");
		 restTemplate.postForObject(UriComponentsBuilder.fromUriString(adminPwaUrl+"/api/v1/webspush/unsubscribe").build().toUri(), subscriptionDto, SubscriptionDto.class);

	}

}
