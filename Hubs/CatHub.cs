using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Cat.Hubs
{
    public class CatHub : Hub
    {
        public async Task MoveCat(string x, string y)
        {
            await Clients.All.SendAsync("ReceiveCoordinate", x, y);
        }
    }
}