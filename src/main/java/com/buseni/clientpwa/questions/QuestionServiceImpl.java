package com.buseni.clientpwa.questions;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class QuestionServiceImpl implements QuestionService {
	
	public static final Logger LOGGER = LoggerFactory.getLogger( QuestionServiceImpl.class );
	
	@Value("${adminpwa.url}")
	private String adminPwaUrl;
	@Value("${adminpwa.accessToken}")
	private String accessToken;
	private RestTemplate restTemplate;
	
	public QuestionServiceImpl(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	

	@Override
	public  Question sendQuestion(Question question) {
	LOGGER.debug("Call API Send question ");
	HttpHeaders headers = new HttpHeaders();
	headers.setContentType(MediaType.APPLICATION_JSON);
	headers.set("Authorization", "Bearer "+ accessToken);
	//Create a new HttpEntity
    final HttpEntity<Question> entity = new HttpEntity<Question>(question,headers);
	URI uri = UriComponentsBuilder.fromUriString(adminPwaUrl+"/api/v1/questions").build().toUri();
	ResponseEntity<Question> responseEntity = restTemplate.exchange(uri, HttpMethod.POST, entity, Question.class);
	if(responseEntity.getStatusCode() == HttpStatus.OK){
        return responseEntity.getBody();
        
     }
	 return question;
	}
}
