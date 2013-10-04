package com.ericsson.ssdo;

import javax.servlet.ServletContext;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.ContextLoaderListener;

public class RamsContextLoaderListener extends ContextLoaderListener{

	@Override
	protected ApplicationContext loadParentContext(ServletContext servletContext) {
		return (ApplicationContext) Application.applicationContext;
	}
}