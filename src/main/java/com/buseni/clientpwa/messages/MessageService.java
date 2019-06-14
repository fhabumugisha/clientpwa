package com.buseni.clientpwa.messages;

import java.util.List;

public interface MessageService {
	
	MessageCollection findAll();
	
	Message  findById(Integer id);
	
	
	

}
