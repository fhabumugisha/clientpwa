package com.buseni.clientpwa.questions;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class QuestionController {
	
	private QuestionService questionService;
	 public QuestionController(QuestionService questionService) {
		this.questionService = questionService;
	}
	
	@GetMapping(value= {"/ask-question"})
	public String askQuestion(Model model) {
		model.addAttribute("question", new Question());
		return "askQuestion";
	}
	
	

	@PostMapping(value= {"/ask-question"})
	public String home(@ModelAttribute Question question, RedirectAttributes ra) {
		questionService.sendQuestion(question);
		ra.addFlashAttribute("confirm", "Question sent successfully");
		return "redirect:/home";
	}
	
	

	@PostMapping(value= {"/ask-question-sync"})
	public @ResponseBody Question home(@ModelAttribute Question question) {
		 return questionService.sendQuestion(question);
	
		
	}
	
	

	
	
	

}
