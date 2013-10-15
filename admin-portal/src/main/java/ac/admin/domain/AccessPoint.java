package ac.admin.domain;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Author:ZhangJianPing  Time:11-8-31 下午12:46
 */
@Entity
@Table(name="t_accesspoint")
public class AccessPoint implements Serializable
{
	private Long apid;
	
	private String ip;

	private String mac;
	
	private String name;
	
	private String building;
	
	private String floor;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Long getApid()
	{
		return apid;
	}

	public void setUserid(Long apid)
	{
		this.apid = apid;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

    public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getMac() {
		return mac;
	}

	public void setMac(String mac) {
		this.mac = mac;
	}

	public String getBuilding() {
		return building;
	}

	public void setBuilding(String building) {
		this.building = building;
	}

	public String getFloor() {
		return floor;
	}

	public void setFloor(String floor) {
		this.floor = floor;
	}

	public void setApid(Long apid) {
		this.apid = apid;
	}

	@Override
	public String toString()
	{
		return null;
/*		return "UserInfo{" +
				"userid=" + userid +
				", username='" + username + '\'' +
				'}';*/
	}
}
