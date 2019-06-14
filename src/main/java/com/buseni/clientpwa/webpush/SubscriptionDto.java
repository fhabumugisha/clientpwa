package com.buseni.clientpwa.webpush;

import java.util.Map;

public class SubscriptionDto {
	
	
	
	public SubscriptionDto() {
		super();
	}
	public SubscriptionDto(String endpoint, Map<String, String> keys) {
		super();
		this.endpoint = endpoint;
		this.keys = keys;
	}
	private String endpoint;
	private Map<String , String>  keys;
	public String getEndpoint() {
		return endpoint;
	}
	public void setEndpoint(String endpoint) {
		this.endpoint = endpoint;
	}
	public Map<String, String> getKeys() {
		return keys;
	}
	public void setKeys(Map<String, String> keys) {
		this.keys = keys;
	}

}
