class User < ApplicationRecord
    has_many :leads
    has_many :vehicles, through: :sales
end
