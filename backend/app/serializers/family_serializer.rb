class FamilySerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :members
    has_many :projects
end