class FamiliesController < ApplicationController
    def index
        families = Family.all
        render json: FamilySerializer.new(families) # update for projects controller
    end

    def show
        family = Family.find_by(id: params[:id]) # (id: params[:id]) - for projects controller
        render json: FamilySerializer.new(family)
    end

    def create
        family = Family.new(family_params)

        family.save
        render json: family
        # may come back to this
    end

    # def create
    #     trainer = Trainer.find_by(id: params[:trainer_id])
    #     trainer.pokemons.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
    #     render json: trainer.pokemons.last
    # end

    private

    def family_params
        params.require(:family).permit(:name, :members)
    end

end
