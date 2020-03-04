class Lead < ApplicationRecord
    belongs_to :client
    belongs_to :user
    belongs_to :vehicle
end
