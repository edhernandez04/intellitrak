class Sale < ApplicationRecord
    belongs_to :user
    belongs_to :client
    belongs_to :vehicle
end
