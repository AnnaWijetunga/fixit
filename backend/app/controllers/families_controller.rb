class FamiliesController < ApplicationController
    def index
        families = Family.all
        render json: FamilySerializer.new(families).to_serialized_json
    end

    def show
        family = Family.find_by(params[:id])
        render json: FamilySerializer.new(family).to_serialized_json
    end

    def create
        family = Family.new(family_params)

        family.save
        render json: family
    end

    private

    def family_params
        params.require(:family).permit(:name, :members)
    end

end
