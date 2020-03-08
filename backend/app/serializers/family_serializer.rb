class FamilySerializer
    def initialize(family_object)
        @family = family_object
    end

    def to_serialized_json
        options = {
            include: {
                projects: {
                    only: [:name, :condition, :id, :family_id]
                }
            },
            except: [:updated_at],
        }
        @family.to_json(options)
    end
end