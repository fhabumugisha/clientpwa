package com.buseni.clientpwa.messages;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MessageController {
	
	private MessageService messageService;
	 public MessageController(MessageService messageService) {
		this.messageService = messageService;
	}
	
	@GetMapping(value= {""})
	public String home(@RequestParam(name="utm_source" , defaultValue="web") String utmSource, Model model) {
		model.addAttribute("messages", messageService.findAll().getMessages());
		return "home";
	}
	
	
	@GetMapping(value= {"/messages"})
	public String consulter(@RequestParam Integer id,
			@RequestParam(name="utm_source" , defaultValue="web") String utmSource,
			Model model) {
		model.addAttribute("message", messageService.findById(id));
		return "message";
	}
	
	
	
	

	
	
	

}
