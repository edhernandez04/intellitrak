class ClientsController < ApplicationController
    def index
        clients = Client.all
        render json: clients
    end
end
