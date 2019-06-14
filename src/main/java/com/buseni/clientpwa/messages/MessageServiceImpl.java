package com.buseni.clientpwa.messages;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class MessageServiceImpl implements MessageService {
	
	public static final Logger LOGGER = LoggerFactory.getLogger( MessageServiceImpl.class );
	
	@Value("${adminpwa.url}")
	private String adminPwaUrl;
	
	@Value("${adminpwa.accessToken}")
	private String accessToken;
	
	private RestTemplate restTemplate;
	
	public MessageServiceImpl(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	@Override
	public MessageCollection findAll() {
		LOGGER.debug("Call API Lister messagess");
		MessageCollection messageCollection = new MessageCollection();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer "+ accessToken);
		//Create a new HttpEntity
        final HttpEntity<String> entity = new HttpEntity<String>(headers);
		try {
			URI uri = UriComponentsBuilder.fromUriString(adminPwaUrl +"/api/v1/messages").build().toUri();
			ResponseEntity<MessageCollection> response = restTemplate.exchange(uri, HttpMethod.GET,entity, MessageCollection.class);
				messageCollection = response.getBody();
		} catch (Exception e) {
			LOGGER.error("Erreur lors de l'appel de l'api " +  e.getMessage());
		}
		return messageCollection;
	}

	@Override
	public Message findById(Integer id) {
		return restTemplate.getForObject(UriComponentsBuilder.fromUriString(adminPwaUrl +"/api/v1/messages/{idMessage}").buildAndExpand(id.toString()).toUri(), Message.class);
	}

	

}
