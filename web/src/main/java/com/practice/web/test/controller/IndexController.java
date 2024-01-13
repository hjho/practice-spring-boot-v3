package com.practice.web.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/")
public class IndexController {
	
	@GetMapping(value = { "/", "/index" })
	public ModelAndView index() {
		ModelAndView mav = new ModelAndView("index");
		log.debug("## INDEX VIEW: {}", "LOG");
		
		return mav;
	}

}
