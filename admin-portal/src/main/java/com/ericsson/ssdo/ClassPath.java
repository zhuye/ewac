package com.ericsson.ssdo;

import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.Arrays;
import java.util.StringTokenizer;
import java.util.Vector;

/**
 * Class to handle CLASSPATH construction
 */
public class ClassPath
{

	private final Vector<File> _elements = new Vector<File>();

	public ClassPath()
	{
	}

	public ClassPath(String initial)
	{
		addClasspath(initial);
	}

	public File[] getElements()
	{
		return _elements.toArray(new File[_elements.size()]);
	}

	public int count()
	{
		return _elements.size();
	}

	public boolean addComponent(String component)
	{
		if ((component != null) && (component.length() > 0))
		{
			try
			{
				File f = new File(component);
				if (f.exists())
				{
					File key = f.getCanonicalFile();
					if (!_elements.contains(key))
					{
						_elements.add(key);
						return true;
					}
				}
			}
			catch (IOException e)
			{
			}
		}
		return false;
	}

	public boolean addComponent(File component)
	{
		if (component != null)
		{
			try
			{
				if (component.exists())
				{
					File key = component.getCanonicalFile();
					if (!_elements.contains(key))
					{
						_elements.add(key);
						return true;
					}
				}
			}
			catch (IOException e)
			{
			}
		}
		return false;
	}

	public boolean addClasspath(String s)
	{
		boolean added = false;
		if (s != null)
		{
			StringTokenizer t = new StringTokenizer(s, File.pathSeparator);
			while (t.hasMoreTokens())
			{
				added |= addComponent(t.nextToken());
			}
		}
		return added;
	}

	public void dump(PrintStream out)
	{
		int i = 0;
		for (File element : _elements)
		{
			out.printf("%2d: %s\n", i++, element.getAbsolutePath());
		}
	}

	@Override
	public String toString()
	{
		StringBuffer cp = new StringBuffer(1024);
		int cnt = _elements.size();
		if (cnt >= 1)
		{
			cp.append(((_elements.elementAt(0))).getPath());
		}
		for (int i = 1; i < cnt; i++)
		{
			cp.append(File.pathSeparatorChar);
			cp.append(((_elements.elementAt(i))).getPath());
		}
		return cp.toString();
	}

	public ClassLoader getClassLoader()
	{
		int cnt = _elements.size();
		URL[] urls = new URL[cnt];
		for (int i = 0; i < cnt; i++)
		{
			try
			{
				String u = ((_elements.elementAt(i))).toURI().toURL()
						.toString();
				urls[i] = new URL(encodeFileURL(u));
			}
			catch (MalformedURLException e)
			{
				e.printStackTrace() ;
			}
		}

		ClassLoader parent = Thread.currentThread().getContextClassLoader();
		if (parent == null)
		{
			parent = ClassPath.class.getClassLoader();
			if (parent == null)
				parent = ClassLoader.getSystemClassLoader();
		}
		
		return new Loader(urls, parent);
	}

	private static class Loader extends URLClassLoader
	{
		String name;

		Loader(URL[] urls, ClassLoader parent)
		{
			super(urls, parent);
			name = "StartLoader" + Arrays.asList(urls);
		}

		@Override
		public String toString()
		{
			return name;
		}
	}

	public static String encodeFileURL(String path)
	{
		byte[] bytes;
		try
		{
			bytes = path.getBytes("utf-8");
		}
		catch (UnsupportedEncodingException e)
		{
			bytes = path.getBytes();
		}

		StringBuffer buf = new StringBuffer(bytes.length * 2);
		buf.append("file:");

		synchronized (buf)
		{
			for (int i = 5; i < bytes.length; i++)
			{
				byte b = bytes[i];
				switch (b)
				{
				case '%':
					buf.append("%25");
					continue;
				case ' ':
					buf.append("%20");
					continue;
				case '/':
				case '.':
				case '-':
				case '_':
					buf.append((char) b);
					continue;
				default:
					// let's be over conservative here!
					if (Character.isJavaIdentifierPart((char) b))
					{
						if (b >= 'a' && b <= 'z' || b >= 'A' && b <= 'Z'
								|| b >= '0' && b <= '9')
						{
							buf.append((char) b);
							continue;
						}
					}
					buf.append('%');
					buf.append(Integer.toHexString((0xf0 & b) >> 4));
					buf.append(Integer.toHexString((0x0f & b)));
					continue;
				}
			}
		}

		return buf.toString();
	}

	/**
	 * Overlay another classpath, copying its elements into place on this
	 * Classpath, while eliminating duplicate entries on the classpath.
	 * 
	 * @param cpOther
	 *            the other classpath to overlay
	 */
	public void overlay(ClassPath cpOther)
	{
		for (File otherElement : cpOther._elements)
		{
			if (this._elements.contains(otherElement))
			{
				// Skip duplicate entries
				continue;
			}
			this._elements.add(otherElement);
		}
	}

	public boolean isEmpty()
	{
		return (_elements == null) || (_elements.isEmpty());
	}
}