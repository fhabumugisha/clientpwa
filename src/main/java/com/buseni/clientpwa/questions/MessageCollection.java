package com.buseni.clientpwa.questions;

import java.util.ArrayList;
import java.util.List;


public class MessageCollection {
	
	private List<Question>  messages = new ArrayList<>();

	public MessageCollection(){
		
	}
	public MessageCollection(List<Question>  messages) {
		this.messages = messages;
	}
	public List<Question> getMessages() {
		return messages;
	}

	public void setMessages(List<Question> messages) {
		this.messages = messages;
	}

}
