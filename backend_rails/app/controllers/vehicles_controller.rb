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

    def update
        newVehicle = Vehicle.find(vehicleParamsForUpdate[:id])
        newVehicle.update(vehicleParamsForUpdate)

    end

    def destroy
        newVehicle = Vehicle.find(params[:id])
        newVehicle.destroy
    end

    private

    def vehicleParams
        params.require(:vehicle).permit(:year, :make, :model, :trim, :color, :vin, :mileage, :purchase_date, 
        :purchase_price, :description, :img_url)
    end

    def vehicleParamsForUpdate
        params.require(:vehicle).permit(:id, :year, :make, :model, :trim, :color, :vin, :mileage, :purchase_date, 
        :purchase_price, :description, :img_url, :sale_price, :sold, :buyer_id)
    end 

end
