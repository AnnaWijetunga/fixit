class ProjectSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :condition, :id, :family_id
    belongs_to :family
end