package ac.admin.service;

import static org.junit.Assert.*;

import org.junit.Test;

public class APCommunicatorTest {

	@Test
	public final void testExecuteAPLogon() {
		APCommunicator apc = new APCommunicator("192.168.0.254");
		String main_page = apc.executeAPLogon();
		main_page = apc.executeAPLogon();
		System.out.println(main_page);
	}

	@Test
	public final void testexecuteWlanConfiguration() {
		APCommunicator apc = new APCommunicator("192.168.0.254");
		String mac = apc.executeAPLogon();
		mac = apc.executeAPLogon();
		
		System.out.println(mac);
		
		String result = apc.executeWirelessBasicConfiguration("Daniel","9");
		System.out.println(result);
	}
	@Test
	public final void executeAdvSetLanipConfiguration() {
		APCommunicator apc = new APCommunicator("192.168.0.254");
		String mac = apc.executeAPLogon();
		mac = apc.executeAPLogon();
		
		System.out.println(mac);
		
		String result = apc.executeAdvSetLanipConfiguration("192.168.0.253");
		System.out.println(result);
	}
	
	@Test
	public final void executeWirelessGetSecurityConfiguration() {
		APCommunicator apc = new APCommunicator("192.168.0.254");
		String mac = apc.executeAPLogon();
		mac = apc.executeAPLogon();
		
		System.out.println(mac);
		
		String result = apc.executeWirelessGetSecurityConfiguration();
		System.out.println(result);
	}
}
