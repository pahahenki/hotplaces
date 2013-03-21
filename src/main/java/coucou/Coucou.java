package coucou;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.codehaus.jettyson.json.JSONObject;



@Path("/coucou")
public class Coucou {
	
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response repondre() {
		JSONObject data = new JSONObject("../ressources/mock_data.json");
		return Response.ok(data.toString()).build();
	}
	
	
}

