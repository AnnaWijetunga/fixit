class FamiliesController < ApplicationController
    def index
        families = Family.all
        render json: FamilySerializer.new(families)
    end

    def show
        family = Family.find_by(id: params[:id])
        options = {
            include: [:name, :members]
        }
        render json: FamilySerializer.new(family, options)
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
