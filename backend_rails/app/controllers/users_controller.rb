class UsersController < ApplicationController 
    def index
        users = User.all
        render json: users
    end

    def update
        user = User.find(userParams[:id].to_i)
        newSales = user.total_sales + userParams[:total_sales].to_i
        newCarsSoldAmount = user.cars_sold + 1
        user.update(total_sales: newSales)
        user.update(cars_sold: newCarsSoldAmount)
    end

    private

    def userParams
        params.require(:user).permit(:id, :total_sales)
    end

end
