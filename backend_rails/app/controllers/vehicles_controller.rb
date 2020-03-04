class VehiclesController < ApplicationController

    def index
        vehicles = Vehicle.all
        render json: vehicles
    end

    def show
        vehicle = Vehicle.find(params[:id])
        render json: vehicle
    end

    def create
        newVehicle = Vehicle.create(vehicleParams)

    end

    private

    def vehicleParams
        params.require(:vehicle).permit(:year, :make, :model, :trim, :color, :vin, :mileage, :purchase_date, 
        :purchase_price, :description, :img_url)
    end

end
