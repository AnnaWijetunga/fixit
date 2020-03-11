class FamiliesController < ApplicationController
    def index
        families = Family.all
        render json: FamilySerializer.new(families)
    end

    def show
        family = Family.find_by(id: params[:id])
        render json: FamilySerializer.new(family)
    end

    def create
        family = Family.create(family_params)
        render json: family
    end

    private

    def family_params
        params.require(:family).permit(:name, :members)
    end

end
