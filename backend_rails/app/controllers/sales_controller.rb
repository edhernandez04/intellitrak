class SalesController < ApplicationController
    def create
        Sale.create(saleParams)
    end
    
    private
    def saleParams
        params.require(:sale).permit(:client_id, :user_id, :vehicle_id)
    end
end