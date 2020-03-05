class Vehicle < ApplicationRecord
    has_many :users, through: :leads
end
