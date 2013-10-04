package com.ericsson.ssdo;

import java.io.File;
import java.io.FilenameFilter;

public class Application {
	public static Object applicationContext;
	public static String configRoot = "conf";

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static void main(String[] args) throws Exception {

		if (String.class.getResource("/") != null)
			configRoot = String.class.getResource("/").getFile() + "conf";

		if (args != null && args.length > 0) {
			for (int i = 0; i < args.length; i++) {
				String cmd = args[i].toLowerCase();
				if (cmd.equals("-n") && i < args.length - 1)
					System.setProperty("system.config.nodetype", args[++i]);
				else if (cmd.equals("-conf") && i < args.length - 1)
					configRoot = args[++i];
			}
		}
		final ClassPath classpath = new ClassPath();
		File commonLibDir = new File("lib");
		commonLibDir.list(new FilenameFilter() {
			@Override
			public boolean accept(File dir, String name) {
				if (name.endsWith(".jar"))
					classpath.addClasspath(dir.getPath() + "/" + name);
				return false;
			}
		});
		Thread.currentThread()
				.setContextClassLoader(classpath.getClassLoader());
		ClassLoader classLoader = Thread.currentThread()
				.getContextClassLoader();
		Class clz = classLoader
				.loadClass("org.apache.log4j.PropertyConfigurator");
		clz.getMethod("configure", String.class).invoke(null,
				configRoot + "/log4j.properties");
		Application instance = new Application();
		clz = classLoader
				.loadClass("org.springframework.context.support.FileSystemXmlApplicationContext");
		instance.applicationContext = clz.getConstructor(String.class)
				.newInstance(configRoot + "/spring-cfg.xml");
		clz.getConstructor(String.class).newInstance(
				configRoot + "/jetty-context.xml");

	}
}
