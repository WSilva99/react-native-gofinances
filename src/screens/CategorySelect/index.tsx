import { FlatList } from "react-native";
import { Button } from "../../components/Form/Button";
import { Header } from "../../components/Header";
import { categories } from "../../utils/categories";
import { Category, CategoryIcon, CategoryName, Container, Footer, Separator } from "./styles";

interface Category {
  key: string;
  name: string;
}

interface CategorySelectProps {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({category, setCategory, closeSelectCategory}: CategorySelectProps) {

  function handleCategorySelect(category: Category) {
    setCategory(category);
  }

  return (
    <Container>
      <Header title="Categoria" />

      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            isActive={category.key === item.key}
            onPress={() => handleCategorySelect(item)}
          >
            <CategoryIcon name={item.icon} />
            <CategoryName>{item.name}</CategoryName>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  )
}