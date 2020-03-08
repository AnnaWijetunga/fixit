class FamilySerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :condition, :id, :family_id
    # has_many :projects -- do I need this  here?

    # def initialize(family_object)
    #     @family = family_object
    # end

    # def to_serialized_json
    #     options = {
    #         include: {
    #             projects: {
    #                 only: [:name, :condition, :id, :family_id]
    #             }
    #         },
    #         except: [:updated_at],
    #     }
    #     @family.to_json(options)
    # end
end