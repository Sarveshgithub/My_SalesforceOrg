public class A 
{  
	public A()    
    {
       method();
    }
	public void method()
	{
   		  LIST<String> lst=new LIST<String>{'a','b','c','d','b'};
     	  MAP<String,Integer> m=new MAP<String,Integer>();
     	  for(String s:lst)
     		{
         		Integer count=1;
         		if(m.containsKey(s))
         		{
                    //count=m.get(s);
                    //count++;
                    m.remove(s);
                }
         		else
                 {
                   m.put(s,count);   
                 }
     		}
     System.debug(m);
     }
}