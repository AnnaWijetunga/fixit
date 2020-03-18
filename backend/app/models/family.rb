# Inherits from ApplicationRecord, Family inherits from ActiveRecord
# We gain methods like .all and .save because of this (i.e. Project.all)
class Family < ApplicationRecord
    has_many :projects
end
