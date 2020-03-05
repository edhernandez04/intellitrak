class LeadsController < ApplicationController
    def index
        leads = Lead.all
        render json: leads, include: [:vehicle, :client]
    end

    def show
        lead = Lead.find(params[:id])
        render json: lead
    end

    def create
        lead = Lead.create(leadParams)

    end

    private

    def leadParams
        params.require(:lead).permit(:client_id, :user_id, :vehicle_id, :note, :closed)
    end

end
