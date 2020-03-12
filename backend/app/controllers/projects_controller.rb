class ProjectsController < ApplicationController
    def index
        projects = Project.all 
        render json: ProjectSerializer.new(projects)
    end

    def show
        project = Project.find_by(id: params[:id])
        render json = ProjectSerializer.new(project)
    end

    def create
        project = Project.create(project_params)
        render json: project
    end

    def update
        project = Project.find_by(id: params[:id])
        project.update(project_params)
        render json: project
    end

    def destroy
        project = Project.find_by(id: params[:id])
        project.destroy
        render json: project
    end

    private

    def project_params
        params.require(:project).permit(:name, :condition, :family_id)
    end
end
