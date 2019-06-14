package com.buseni.clientpwa.messages;

import java.util.ArrayList;
import java.util.List;


public class MessageCollection {
	
	private List<Message>  messages = new ArrayList<>();

	public MessageCollection(){
		
	}
	public MessageCollection(List<Message>  messages) {
		this.messages = messages;
	}
	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

}
