package ac.admin.test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import ac.admin.service.UserService;

/**
 * Author:ZhangJianPing  Time:11-9-4,下午8:57
 */
public class SimpleSpringJpaDemo {
    public static void main(String[] args) {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("spring-demo-cfg.xml");
        UserService userService = ctx.getBean("userService", UserService.class);
//        userService.createNewAccount("g", "ggg", 700);
        System.out.println(userService.findByBalanceGreaterThan(100, new PageRequest(1, 2)));
    }
}
