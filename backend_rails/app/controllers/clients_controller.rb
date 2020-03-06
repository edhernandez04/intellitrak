class ClientsController < ApplicationController
    def index
        clients = Client.all
        render json: clients
    end

    def create
        client = Client.create(clientParams)
    end

    private

    def clientParams
        params.require(:client).permit(:fullname, :phone_number, :email, :address)
    end
end
