package ac.admin.service;

import java.io.IOException;

import org.apache.http.client.fluent.Form;
import org.apache.http.client.fluent.Request;

public class APCommunicator {

	String ipOfAP = "192.168.0.254";

	public APCommunicator(String ip) {
		ipOfAP = ip;
	}

	public String executeAPLogon() {
		try {
			Request.Post("http://" + ipOfAP + "/login/Auth")
					.bodyForm(
							Form.form().add("username", "admin")
									.add("password", "admin").build())
					.execute();
			Request.Get("http://" + ipOfAP + "/index.asp").execute()
					.returnContent().toString();
			String main_page = Request
					.Get("http://" + ipOfAP + "/lanStatus.asp").execute()
					.returnContent().toString();
			return pickupMAC(main_page);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	private String pickupMAC(String main_page) {
		int i = main_page.indexOf("lan_mac=") + 1;
		if (i > 0) {
			String lan_mac = main_page.substring(i + 8, i + 25);
			return lan_mac;
		} else {
			return "Logon fail!";
		}
	}

	public String executeWirelessBasicConfiguration(String u_ssid, String u_mode) {

		String enablewirelessEx = "1";
		String enablewireless = "1";
		String broadcastssid = "0";
		String ssid = "I did it again!";
		if(u_ssid.length()>0)
			ssid = u_ssid;
		String wirelessmode = "9";
		if(u_mode.length()>0){
			if(u_mode.equals("2"))
				u_mode = "4";
			if(u_mode.equals("3"))
				u_mode = "9";
			wirelessmode = u_mode;
		}
		String channel = "0";
		String bandwidth = "1";
		String n_extcha = "0";
		String shtPower = "30";
		String wmm_capable = "on";
		String apsd_capable = "on";
		String ap_isolate = "on";
		try {
			Request.Post("http://" + ipOfAP + "//goform/wirelessBasic")
					.bodyForm(
							Form.form().add("GO", "wireless_basic.asp")
									.add("enablewirelessEx", enablewirelessEx)
									.add("enablewireless", enablewireless)
									.add("broadcastssid", broadcastssid)
									.add("ssid", ssid)
									.add("wirelessmode", wirelessmode)
									.add("channel", channel)
									.add("bandwidth", bandwidth)
									.add("n_extcha", n_extcha)
									.add("shtPower", shtPower)
									.add("wmm_capable", wmm_capable)
									.add("apsd_capable", apsd_capable)
									.add("ap_isolate", ap_isolate).build())
					.execute();
			return "executed";
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	public String executeAdvSetLanipConfiguration(String ipAddress) {
		String ip = "192.168.0.254";
		if(ipAddress.length()>0)
			ip = ipAddress;
			
		try {
			Request.Post("http://" + ipOfAP + "//goform/AdvSetLanip")
					.bodyForm(
							Form.form().add("LANMODE", "1")
									.add("LANIP", ipAddress)
									.add("LANMASK", "255.255.255.0")
									.add("LANGW", "192.168.0.1").build())
					.execute();
			return "executed";
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	public String executeWirelessGetSecurityConfiguration() {
		try {
			Request.Post("http://" + ipOfAP + "//goform/wirelessGetSecurity")
					.bodyForm(
							Form.form().add("GO", "wireless_security.asp")
									.add("security_mode", "Disable").build())
					.execute();
			return "executed";
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
