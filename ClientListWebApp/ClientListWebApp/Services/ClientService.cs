using ClientListWebApp.Models;
using ClientListWebApp.Services.Interfaces;

namespace ClientListWebApp.Services
{
    public class ClientService : IClientService
    {
        private readonly DbAppContext _appContext;

        public ClientService(DbAppContext context)
        {
            _appContext = context;
        }
        public int Save(Client client)
        {
            //save to db
            _appContext.Clients.Add(client);
            _appContext.SaveChanges();
            return client.Id;
        }
    }
}
