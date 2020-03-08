class ProjectSerializer
    def initialize(project_object)
        @project = project_object
    end

    def to_serialized_json
        options = {
            include: {
                family: {
                    only: [:name, :members]
                }
            },
            except: [:updated_at],
        }
        @project.to_json(options)
    end
end