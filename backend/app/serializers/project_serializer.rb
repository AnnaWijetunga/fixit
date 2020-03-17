# Serializers
# A service class is a class specific to our domain that handles some of the business logic of the application. 
#  If we can extract the work of customizing our JSON data and put it somewhere else, we could keep our controller actions cleaner.

# Fast JSON API
# We can use these serializer classes to define the specific attributes we want objects to share or not share.
# The result is that in our controller actions, rather than writing a custom render each time, we write out a serializer for each object once and use Fast JSON API to control the way our data is structured.
# When rendering JSON directly, controllers will render all attributes available by default. These serializers work the other way around - we must always specify what attributes we want to include.
# We also include the relationships we want to reflect in our serializers.

class ProjectSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :condition, :id, :family_id
    belongs_to :family
end