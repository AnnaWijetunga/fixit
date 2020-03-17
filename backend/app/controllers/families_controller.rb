class FamiliesController < ApplicationController
    def index
        # Now that we are directly rendering to JSON in the same action, we no longer need to deal with instance variables and can instead just use a local variable:
        families = Family.all
        # We used to display ERB - but now we need to render JSON 
        render json: FamilySerializer.new(families)
        # When we include an array or hash after render json:, Rails is being accomodating and implicitly handling the work of converting that array or hash to JSON.
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
