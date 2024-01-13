package com.practice.web.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/test")
public class TestController {
	
	@GetMapping("/view")
	public ModelAndView view() {
		log.debug("## TEST VIEW: {}", "LOG");
		ModelAndView mav = new ModelAndView("/test/testView");
		
		return mav;
	}

}
