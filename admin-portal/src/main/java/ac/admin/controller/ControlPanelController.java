package ac.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ControlPanelController {

	@RequestMapping("/helloWorld")
	public String helloWorld(Model model) {
		model.addAttribute("message", "Hello World!");
		return "welcome";
	}
/*	@RequestMapping("/contropanel")
	public String controPanel(Model model) {
		model.addAttribute("message", "Hello World!");
		return "WuXianWangLuo";
	}*/
	@RequestMapping("/contropanel")
	public ModelAndView controPanel(Model model) {
		model.addAttribute("message", "Hello World!");
		return new ModelAndView("forward:/WuXianWangLuo.jsp");
	}
}
