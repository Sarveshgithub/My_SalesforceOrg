public class Query 
{
    LIST<Contact> lst=new LIST<Contact>();
	public Query()
	{
    	fetch_data();
	}
    public void fetch_data()
    {
        for(Account a:[select id,name,
                       (select id,name from contacts),
                       (select id,name from opportunities),
                       (select id,name from Account1s__r)
                       from account where name='TCS'
                      ])
          {  
            System.debug('>>>>>>'+a.name);
            System.debug('>>>>>>'+a.id); 
            for(Contact c:a.contacts)
            {
                
                lst.add(c);
                System.debug('>>>>'+c.name);
            }
            for(Opportunity o:a.opportunities)
            {
                System.debug('>>>>'+o.name);
                System.debug('>>>>'+o.id);
            }
            for(Account1__c a1:a.Account1s__r)
            {
              System.debug('>>>'+a1.name);  
            }
            
          }  
        for(Contact c:lst)
        {
            System.debug('>>>>'+c);
        }
    }
}