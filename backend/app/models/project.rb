# Inherits from ApplicationRecord, Project inherits from ActiveRecord
# We gain methods like .all and .save because of this (i.e. Project.all)
class Project < ApplicationRecord
    belongs_to :family
end
