class LeadsController < ApplicationController
    def index
        leads = Lead.all
        render json: leads, include: [:vehicle, :client]
    end

    def show
        lead = Lead.find(params[:id])
        render json: Lead
    end

    def create
        newLead = Lead.create(LeadParams)

    end

    private

    def LeadParams
        params.require(:Lead).permit(:client_id, :user_id, :note, :closed)
    end

end
